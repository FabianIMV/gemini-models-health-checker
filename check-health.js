const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');

const apiKeys = {
  fabian: process.env.GEMINI_API_KEY_FABIAN,
  vicente: process.env.GEMINI_API_KEY_VICENTE
};

const models = ['gemini-1.5-flash-002', 'gemini-2.5-pro'];

async function checkModel(owner, apiKey, modelName) {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelName });
    const start = Date.now();
    await model.generateContent('OK');
    const responseTime = Date.now() - start;
    
    console.log(`✅ ${owner} - ${modelName}: DISPONIBLE (${responseTime}ms)`);
    
    return {
      status: 'online',
      responseTime,
      error: ''
    };
  } catch (error) {
    console.log(`❌ ${owner} - ${modelName}: ERROR - ${error.message}`);
    
    return {
      status: 'offline',
      responseTime: 0,
      error: error.message
    };
  }
}

async function main() {
  const timestamp = new Date().toISOString();
  const results = {
    timestamp,
    fabian: {
      flash: await checkModel('Fabián', apiKeys.fabian, 'gemini-1.5-flash-002'),
      pro: await checkModel('Fabián', apiKeys.fabian, 'gemini-2.5-pro')
    },
    vicente: {
      flash: await checkModel('Vicente', apiKeys.vicente, 'gemini-1.5-flash-002'),
      pro: await checkModel('Vicente', apiKeys.vicente, 'gemini-2.5-pro')
    }
  };
  
  // Guardar status actual
  fs.writeFileSync('status.json', JSON.stringify(results, null, 2));
  
  // Agregar a historial
  let history = [];
  try {
    history = JSON.parse(fs.readFileSync('history.json', 'utf8'));
  } catch (e) {
    console.log('Creando nuevo archivo de historial...');
  }
  
  history.push(results);
  
  // Mantener solo últimas 168 horas (7 días)
  if (history.length > 168) {
    history = history.slice(-168);
  }
  
  fs.writeFileSync('history.json', JSON.stringify(history, null, 2));
  
  console.log('\n✅ Status y historial actualizados');
}

main().catch(console.error);
