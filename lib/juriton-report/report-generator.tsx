import { EvalResult } from '../juriton-eval/types';

export class ReportGenerator {
  generateHTML(evalResult: EvalResult, title: string = 'Juriton Evaluation Report'): string {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; color: #222; }
          .header { background: linear-gradient(135deg, #000 0%, #1e3a8a 100%); color: white; padding: 30px; border-radius: 8px; margin-bottom: 30px; }
          .metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 30px 0; }
          .metric-card { background: #f5f5f5; padding: 20px; border-radius: 8px; border-left: 4px solid #fbbf24; }
          .metric-value { font-size: 28px; font-weight: bold; color: #1e3a8a; }
          .metric-label { color: #666; margin-top: 8px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background: #f5f5f5; font-weight: 600; }
          .score-high { color: #16a34a; }
          .score-medium { color: #f59e0b; }
          .score-low { color: #dc2626; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${title}</h1>
          <p>Relatório de Avaliação do Juriton</p>
        </div>
        
        <div class="metrics">
          <div class="metric-card">
            <div class="metric-value ${this.getScoreClass(evalResult.score)}">${(evalResult.score * 100).toFixed(1)}%</div>
            <div class="metric-label">Score Geral</div>
          </div>
          ${Object.entries(evalResult.metrics || {}).map(([key, value]) => `
            <div class="metric-card">
              <div class="metric-value">${typeof value === 'number' ? value.toFixed(2) : value}</div>
              <div class="metric-label">${key}</div>
            </div>
          `).join('')}
        </div>

        <h2>Exemplos Avaliados</h2>
        ${evalResult.convos?.map((convo, idx) => `
          <div style="background: #f9fafb; padding: 15px; margin: 15px 0; border-radius: 6px;">
            <h3>Exemplo ${idx + 1}</h3>
            ${convo.map(msg => `
              <div style="margin: 10px 0; padding: 10px; background: ${msg.role === 'user' ? '#dbeafe' : '#f0fdf4'}; border-radius: 4px;">
                <strong>${msg.role}:</strong> ${msg.content.substring(0, 100)}...
              </div>
            `).join('')}
          </div>
        `).join('')}
      </body>
      </html>
    `;
    return htmlContent;
  }

  private getScoreClass(score: number | null): string {
    if (!score) return '';
    if (score >= 0.8) return 'score-high';
    if (score >= 0.5) return 'score-medium';
    return 'score-low';
  }

  downloadReport(html: string, filename: string = 'juriton-report.html'): void {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
}
