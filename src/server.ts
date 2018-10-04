import my from './app';

my.app.listen(my.port, () => console.log(`Server is running on PORT=${my.port}`));

process.once('SIGUSR2', () => process.kill(process.pid, 'SIGUSR2'));
process.on('SIGINT', () => process.exit(0));