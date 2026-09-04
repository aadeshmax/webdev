/**
 * Interactive Developer Terminal Component
 * Provides an authentic CLI experience with command history, tab autocomplete,
 * matrix mode, theme switching, and easter eggs.
 */

class PortfolioTerminal {
  constructor(containerId = "terminal-body") {
    this.container = document.getElementById(containerId);
    this.input = document.getElementById("terminal-input");
    this.form = document.getElementById("terminal-form");
    this.output = document.getElementById("terminal-output");
    
    if (!this.container || !this.input || !this.form || !this.output) return;

    this.history = [];
    this.historyIndex = -1;
    this.isMatrixRunning = false;
    this.matrixInterval = null;

    this.commands = (window.PORTFOLIO_DATA && window.PORTFOLIO_DATA.terminal && window.PORTFOLIO_DATA.terminal.commands) || {};
    this.init();
  }

  init() {
    this.printWelcome();
    this.addListeners();
  }

  printWelcome() {
    const welcome = `
<span class="term-dim">┌────────────────────────────────────────────────────────┐</span>
<span class="term-dim">│</span>  <span class="term-cyan">AADESH.OS v2.4</span> [Interactive Portfolio Terminal]       <span class="term-dim">│</span>
<span class="term-dim">│</span>  Type <span class="term-accent">help</span> to view available system commands.          <span class="term-dim">│</span>
<span class="term-dim">└────────────────────────────────────────────────────────┘</span>
`;
    this.appendOutput(welcome, true);
  }

  addListeners() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleCommand(this.input.value.trim());
      this.input.value = "";
    });

    this.input.addEventListener("keydown", (e) => {
      if (this.isMatrixRunning) {
        this.stopMatrix();
        return;
      }

      // History navigation: Up Arrow
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (this.history.length > 0 && this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.history.length - 1 - this.historyIndex];
        }
      }
      // History navigation: Down Arrow
      else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.history[this.history.length - 1 - this.historyIndex];
        } else if (this.historyIndex === 0) {
          this.historyIndex = -1;
          this.input.value = "";
        }
      }
      // Tab Autocomplete
      else if (e.key === "Tab") {
        e.preventDefault();
        this.autocomplete();
      }
    });

    // Clicking anywhere in the terminal focuses the prompt
    this.container.addEventListener("click", () => {
      this.input.focus();
    });
  }

  autocomplete() {
    const current = this.input.value.trim().toLowerCase();
    if (!current) return;

    const available = Object.keys(this.commands).concat(["clear", "matrix", "theme", "quote", "time", "contact"]);
    const matches = available.filter(cmd => cmd.startsWith(current));

    if (matches.length === 1) {
      this.input.value = matches[0];
    } else if (matches.length > 1) {
      this.appendLine(`<span class="term-prompt">visitor@aadesh:~$</span> ${current}`);
      this.appendLine(`<span class="term-dim">${matches.join("   ")}</span>`);
    }
  }

  handleCommand(rawCmd) {
    if (!rawCmd && rawCmd !== "") return;
    if (rawCmd === "") {
      this.appendLine(`<span class="term-prompt">visitor@aadesh:~$</span>`);
      return;
    }

    // Play subtle keystroke/cmd audio if audio enabled
    if (window.soundFX) window.soundFX.playBeep(440, 0.04);

    this.history.push(rawCmd);
    this.historyIndex = -1;

    this.appendLine(`<span class="term-prompt">visitor@aadesh:~$</span> <span class="term-cmd">${this.escapeHtml(rawCmd)}</span>`);

    const parts = rawCmd.split(" ");
    const cmd = parts[0].toLowerCase();
    const arg = parts[1] ? parts[1].toLowerCase() : "";

    switch (cmd) {
      case "clear":
      case "cls":
        this.output.innerHTML = "";
        break;

      case "help":
        this.appendLine(this.formatOutput(this.commands.help));
        break;

      case "matrix":
        this.startMatrix();
        break;

      case "theme":
        this.handleThemeCommand(arg);
        break;

      case "time":
        const now = new Date();
        this.appendLine(`<span class="term-cyan">Local Server Time:</span> ${now.toLocaleString()} (Asia/Kolkata UTC+05:30)`);
        break;

      case "quote":
        const quotes = [
          "“Simplicity is prerequisite for reliability.” — Edsger W. Dijkstra",
          "“First, solve the problem. Then, write the code.” — John Johnson",
          "“Make it work, make it right, make it fast.” — Kent Beck",
          "“Code is like humor. When you have to explain it, it’s bad.” — Cory House"
        ];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        this.appendLine(`<span class="term-purple">${randomQuote}</span>`);
        break;

      case "cat":
        if (arg === "resume" || arg === "resume.txt") {
          this.appendLine(`<span class="term-green">Accessing verified credentials...</span>`);
          this.appendLine(`Resume link: <a href="#contact" class="term-link">Jump to Contact & Resume Download Section</a>`);
        } else {
          this.appendLine(`cat: ${this.escapeHtml(arg)}: No such file or directory. Try 'cat resume'`);
        }
        break;

      case "echo":
        this.appendLine(this.escapeHtml(parts.slice(1).join(" ")));
        break;

      default:
        if (this.commands[cmd]) {
          this.appendLine(this.formatOutput(this.commands[cmd]));
        } else {
          this.appendLine(`<span class="term-red">zsh: command not found: ${this.escapeHtml(cmd)}. Type <span class="term-accent">'help'</span> for instructions.</span>`);
        }
        break;
    }

    this.scrollToBottom();
  }

  handleThemeCommand(themeName) {
    const validThemes = ["cyan", "violet", "emerald", "amber"];
    if (!themeName) {
      this.appendLine(`Usage: theme &lt;name&gt; (Available: ${validThemes.join(", ")})`);
      return;
    }
    if (validThemes.includes(themeName)) {
      if (window.setTheme) {
        window.setTheme(themeName);
        this.appendLine(`<span class="term-green">✔ Switched portfolio accent theme to ${themeName}.</span>`);
      }
    } else {
      this.appendLine(`<span class="term-red">Unknown theme '${themeName}'. Options: ${validThemes.join(", ")}</span>`);
    }
  }

  startMatrix() {
    this.isMatrixRunning = true;
    this.appendLine(`<span class="term-green">Entering Matrix digital stream... (Press any key or type to exit)</span>`);
    
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEF";
    let count = 0;

    this.matrixInterval = setInterval(() => {
      count++;
      let line = "";
      for (let i = 0; i < 48; i++) {
        line += chars[Math.floor(Math.random() * chars.length)] + " ";
      }
      this.appendLine(`<span class="term-matrix">${line}</span>`);
      this.scrollToBottom();

      if (count > 25) {
        this.stopMatrix();
      }
    }, 120);
  }

  stopMatrix() {
    if (this.matrixInterval) {
      clearInterval(this.matrixInterval);
      this.matrixInterval = null;
    }
    this.isMatrixRunning = false;
    this.appendLine(`<span class="term-dim">[Matrix stream terminated]</span>`);
    this.scrollToBottom();
  }

  formatOutput(text) {
    return text.split("\n").map(l => this.escapeHtml(l)).join("<br>");
  }

  appendLine(html) {
    const line = document.createElement("div");
    line.className = "term-line";
    line.innerHTML = html;
    this.output.appendChild(line);
  }

  appendOutput(html, isRaw = false) {
    const div = document.createElement("div");
    div.innerHTML = isRaw ? html : this.escapeHtml(html);
    this.output.appendChild(div);
  }

  scrollToBottom() {
    this.container.scrollTop = this.container.scrollHeight;
  }

  escapeHtml(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.portfolioTerminal = new PortfolioTerminal("terminal-body");
});
