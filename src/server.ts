import { App } from './app';

const _App = new App();

_App.app.listen(_App.port, () => console.log(`Server is running on PORT=${_App.port}`));

process.once('SIGUSR2', () => process.kill(process.pid, 'SIGUSR2'));
process.on('SIGINT', () => process.exit(0));