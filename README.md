# REST API with TypeScript, Node, Express and [Facebook Node SDK](https://github.com/node-facebook/facebook-node-sdk)

## How to start application
1. Install [Node.js](http://nodejs.org/)
2. npm install -g typescript ts-node nodemon copyfiles
3. git clone [facebook-api](#)
4. cd facebook-api && npm install
5. npm start OR npm run nodemon OR start debug with VSCode

    Avaliable by default in http://localhost:3000/

    Enjoy!

## How to deploy application
1. cd facebook-api && npm run build
2. copy dist folder to target server
3. cd dist && npm install
4. node server.js OR set PORT=8080 && node server.js

    Avaliable in http://{server}:{port}/

    Enjoy!

### To set a different PORT
1. Include in package.json scripts [custom] before npm command

    `
    "set PORT=8080 && [...]"
    `

### To set debug configuration in VSCode

    `
    {
        // Use IntelliSense to learn about possible attributes.
        // Passe o mouse para ver as descrições dos atributos existentes.
        // Para obter mais informações, visite: https://go.microsoft.com/fwlink/?linkid=830387
        "version": "0.2.0",
        "configurations": [        
            {
                "type": "node",
                "request": "launch",
                "name": "Launch via NPM",
                "runtimeExecutable": "npm",
                "runtimeArgs": [
                    "run",
                    "debug"
                ],
                "port": 9229
            }
        ]
    }
    `