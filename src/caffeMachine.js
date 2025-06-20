class cafeMachine {
    constructor() {
        this.nominals = [1, 5, 10, 20, 50].reverse();
        this.change = [50, 10, 5];
    }

    coffeeTypes = {
        americano: {price: 10},
        latte: {price: 20},
        cappuccino: {price: 30}
    };


    checkCoins(remain = 5) {
        this.change = []; // Reset change array
        for (const nominal of this.nominals) {
            while (remain >= nominal) {
                this.change.push(nominal);
                remain -= nominal;
            }
        }
        return remain; // Return remaining amount (should be 0 if exact change is possible)
    }

    makeCoffee(name, coins) {
        const totalCoins = coins.reduce((acc, curr) => acc + curr, 0);
        if (totalCoins < this.coffeeTypes[name].price) {
            console.log('Not enough money');
            return;
        }
        console.log('totalCoins', totalCoins);
        let remain = totalCoins - this.coffeeTypes[name].price;
        this.checkCoins(remain);
        console.log('this.change', this.change);
    }
}

const myMachine = new cafeMachine();
myMachine.makeCoffee('americano', [10, 10, 10, 5, 1]);
