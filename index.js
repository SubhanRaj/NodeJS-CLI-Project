#!/usr/bin/env Node
// An Interactive JavaScript Terminal Quiz, made using Node
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import {
    createSpinner
} from 'nanospinner';

// console.log(chalk.bgGreen('Hello World')); //Sample to show how to use chalk

// global variable for player name 
let playerName;

// helper function to display animation

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

// Async function welcome whihc will disply, who want's to be a JS millionaire using chalk-animation

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        'Who Wants to be a JavaScript Millionaire? \n'
    );
    // Calling await sleep function to display animation
    await sleep();
    rainbowTitle.stop();

    console.log(`
        ${chalk.bgBlue('How To Play')}
        I'm a process on your computer.
        If you get any wrong question I will be ${chalk.bgRed('KILLED!!!')}
    `);

}
// Using inquirer to ask user for name

async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default () {
            return 'Player';
        }
    });
    playerName = answers.player_name;
}
// Using inquirer for Multiple Choice Question about JavaScript

// Question 1
async function question1() {
    const answer = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'JavaScript is created in 10 days, and then released on\n',
        choices: [
            'May 23rd, 1995',
            'Nov 24th, 1995',
            'Dec 4th, 1995',
            'Dec 17th, 1995'
        ],
    });
    // Handeling UI based on whether user got the question right or wrong
    return handleAnswer(answer.question_1 == 'Dec 4th, 1995');
}
async function question2() {
    const answer = await inquirer.prompt({
        name: 'question_2',
        type: 'list',
        message: 'Who\`s the creater of JavaScript\n',
        choices: [
            'Bjarne Stroustrup',
            'Linus Torvalds',
            'Sir Tim Berners-Lee',
            'Brendan Eich'
        ],
    });
    // Handeling UI based on whether user got the question right or wrong
    return handleAnswer(answer.question_2 == 'Brendan Eich');
}
async function question3() {
    const answer = await inquirer.prompt({
        name: 'question_3',
        type: 'list',
        message: 'Where did JavaScript was created\n',
        choices: [
            'BELL Labs',
            'Mozilla Foundation',
            'Netscape Communications Corporation',
            'In Garage of Brendan Eich'
        ],
    });
    // Handeling UI based on whether user got the question right or wrong
    return handleAnswer(answer.question_3 == 'Netscape Communications Corporation');
}

// Loading Spinner
async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking Answer...').start();
    await sleep();

    if (isCorrect) {
        spinner.success({
            text: `Nice Work ${playerName}! That's a legit answer!`
        });
    } else {
        spinner.error({
            text: `💀️💀️💀️ Game over, you lose ${playerName}! 💀️💀️💀️`
        });
        process.exit(1);
    }

}

// Function for Displaying Congratulation Message to winning player

function winner() {
    console.clear();
    const msg = `Congratulations ${playerName}!\n You became a JavaScript\n Millionaire  $ 1,000,000, \ncredit added to your account`;
    // Passing the message to figlet to display as ASCII art

    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    });
}

// Callling Welcome function to display welcome message
await welcome();

// Calling askName function to ask user for name
await askName();

// Calling questionN functions to ask user for question
await question1();
await question2();
await question3();

// Calling winner function to display winning message
await winner();