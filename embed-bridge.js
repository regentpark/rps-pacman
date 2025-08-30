// Simple message bridge for iframe embedding.
// Parent can postMessage({ type: 'pacman', action: 'start' | 'pause' | 'resume' | 'reset' })
(function () {
  const startGame = () => {
    // Hook into your game’s own start routine here
    // e.g., window.game.start() OR dispatchEvent for your code to listen to:
    window.dispatchEvent(new CustomEvent("pacman:start"));
  };
  const pauseGame = () => {
    window.dispatchEvent(new CustomEvent("pacman:pause"));
  };
  const resumeGame = () => {
    window.dispatchEvent(new CustomEvent("pacman:resume"));
  };
  const resetGame = () => {
    window.dispatchEvent(new CustomEvent("pacman:reset"));
  };

  window.addEventListener("message", (event) => {
    // Optionally restrict origin: if (event.origin !== "https://yourdomain") return;
    const data = event.data || {};
    if (data && data.type === "pacman") {
      switch (data.action) {
        case "start":  startGame();  break;
        case "pause":  pauseGame();  break;
        case "resume": resumeGame(); break;
        case "reset":  resetGame();  break;
      }
    }
  });

  // Optional: let the parent know when the game is ready to receive commands
  window.parent?.postMessage({ type: "pacman", status: "ready" }, "*");
})();
