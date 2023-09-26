#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import * as emoji from 'node-emoji'

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome(){
    const raibowTitle = chalkAnimation.rainbow(
        'Vamos Jogar Um Jogo de Perguntas?'
    )

    await sleep();
    raibowTitle.stop();

    console.log(`
      ${chalk.bgBlue('COMO JOGAR')}
      Você terá apenas uma chance para cada pergunta.
      Se você errar eu serei ${chalk.red('morto')}
      Caso acertar todas ganhará uma recompensa $$$.
      ${chalk.bgGreen('Pronto?')}
      
    `)
}

async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'Qual é o seu nome?',
        default() {
            return 'Player';
        },
    });

    playerName = answers.player_name;
}

async function question01() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'Qual é a linguagem de programação mais antiga ainda em uso?\n',
        choices: [
            'COBOL',
            'Lisp',
            'BASIC',
            'Fortran',
            'C',
        ]
    })
    
    return handAnswer(answers.question_1 == 'Fortran');
}

async function question02() {
    const answers = await inquirer.prompt({
        name: 'question_2',
        type: 'list',
        message: 'Qual é a linguagem de programação mais popular de 2023?\n',
        choices: [
            'C#',
            'Python',
            'SQL',
            'JavaScript',
            'PHP',
        ]
    })
    
    return handAnswer(answers.question_2 == 'Python');
}

async function question03() {
    const answers = await inquirer.prompt({
        name: 'question_3',
        type: 'list',
        message: `Qual é o resultado da seguinte operação em JavaScript? \n 
        ${chalk.blue('let')}x = "10"
        ${chalk.blue('let')}y = "5"
        ${chalk.blue('let')}resultado = x + y:`,
        choices: [
            `"15"`,
            `"105"`,
            '15',
            '105',
        ]
    })
    
    return handAnswer(answers.question_3 == `"105"`);
}

async function handAnswer(isCorrect) {
    const spinner = createSpinner('Analisando resposta...').start();
    await sleep();

    if (isCorrect) {
        spinner.success({ text: `Bom trabalho, você acertou a primeira ${playerName}.` });
        `Lembre-se se errar eu ${chalk.red('morrerei')}`
    } else {
        spinner.error({ text:`☠ ☠ ☠ Game Over, você errou ${playerName}.`})
        const Spinner = createSpinner('Iniciando auto-destruição').start();
        await sleep();
        process.exit(1);
    }
}

function winner() {
    console.clear();
    const msg = `Parabéns, ${playerName} ! \n $$$ 1 , 000 , 000`

    figlet (msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    })
}

await welcome()
await askName()
await question01()
await question02()
await question03()
await winner();

