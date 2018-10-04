import My from './app';

My.app.listen(My.port, () => console.log(`Server is running on PORT=${My.port}`));

process.once('SIGUSR2', () => process.kill(process.pid, 'SIGUSR2'));
process.on('SIGINT', () => process.exit(0));