const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs').promises;

const CONFIG = {
  owners: [
    { id: 'fabian', name: 'Fabián', key: process.env.GEMINI_API_KEY_FABIAN },
    { id: 'vicente', name: 'Vicente', key: process.env.GEMINI_API_KEY_VICENTE }
  ],
  models: [
    { key: 'flash', name: 'gemini-2.5-flash' },
    { key: 'pro', name: 'gemini-2.5-pro' }
  ],
  maxHistoryEntries: 168
};

async function checkModel(ownerName, apiKey, modelName) {
  if (!apiKey) {
    console.log(`⚠️ ${ownerName} - ${modelName}: Sin API key configurada`);
    return { status: 'offline', responseTime: 0, error: 'API key no configurada' };
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelName });
    
    const start = Date.now();
    await model.generateContent('OK');
    const responseTime = Date.now() - start;

    console.log(`✅ ${ownerName} - ${modelName}: DISPONIBLE (${responseTime}ms)`);
    return { status: 'online', responseTime, error: '' };
  } catch (error) {
    console.log(`❌ ${ownerName} - ${modelName}: ERROR - ${error.message}`);
    return { status: 'offline', responseTime: 0, error: error.message };
  }
}

async function updateHistory(newResults) {
  let history = [];
  try {
    const data = await fs.readFile('history.json', 'utf8');
    history = JSON.parse(data);
  } catch {
    console.log('Creando nuevo archivo de historial...');
  }

  history.push(newResults);

  if (history.length > CONFIG.maxHistoryEntries) {
    history = history.slice(-CONFIG.maxHistoryEntries);
  }

  await fs.writeFile('history.json', JSON.stringify(history, null, 2));
}

async function main() {
  const timestamp = new Date().toISOString();
  const results = { timestamp };

  // Run all health checks concurrently across all owners and models
  await Promise.all(
    CONFIG.owners.map(async (owner) => {
      results[owner.id] = {};
      await Promise.all(
        CONFIG.models.map(async (model) => {
          results[owner.id][model.key] = await checkModel(
            owner.name,
            owner.key,
            model.name
          );
        })
      );
    })
  );

  // Write status and append history asynchronously
  await Promise.all([
    fs.writeFile('status.json', JSON.stringify(results, null, 2)),
    updateHistory(results)
  ]);

  console.log('\n✅ Status y historial actualizados');
}

main().catch(console.error);
