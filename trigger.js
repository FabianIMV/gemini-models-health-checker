// Script para disparar workflow sin token usando bookmarklet
// Este script debe ser ejecutado en la página de GitHub Actions

(function() {
    // Buscar el botón "Run workflow"
    const runButton = document.querySelector('button[data-hotkey="w"]') || 
                     document.querySelector('button:has-text("Run workflow")') ||
                     document.querySelector('[aria-label="Run workflow"]');
    
    if (runButton) {
        runButton.click();
        
        // Esperar un poco y hacer click en el botón del modal
        setTimeout(() => {
            const confirmButton = document.querySelector('button[type="submit"]') ||
                                document.querySelector('.btn-primary');
            if (confirmButton) {
                confirmButton.click();
                console.log('✅ Workflow disparado!');
            }
        }, 500);
    }
})();
