let lastId = 0; // Variable to keep track of the last used ID for transactions

const randomId = () => {
  // Function to generate a random ID for transactions
  return Math.floor(Math.random() * 1000) + ++lastId; // Generates a unique ID
};

class SplitPaymentCalcClass {
  constructor(expenses) {
    this.expenses = expenses; // Stores the expenses provided during object instantiation
    this.total = this.calculate_total(); // Calculates the total expenses
  }

  get_transactions() {
    const [bins, items] = this.calculate_bins_and_items(); // Calculates bins `(where someone paid more) and items (where someone paid less)

    if (bins.length === 1) {
      const bin = bins[0];
      // If there's only one bin, distribute items to that person
      return items.map((item) => ({
        id: randomId(), // Generates a unique transaction ID
        from_friend: item.friend,
        to_friend: bin.friend,
        amount: item.amount.toFixed(2), // Rounds the amount to 2 decimal places
      }));
    }

    const result = [];

    items.forEach((item) => {
      let item_amount = item.amount;

      for (let i = 0, len = bins.length; i < len; i++) {
        const bin = bins[i];

        if (+bin.amount.toFixed(1) >= +item_amount.toFixed(1)) {
          // If the bin's amount is greater than or equal to the item's amount, assign the transaction
          bin.amount -= item_amount; // Deducts the item's amount from the bin
          result.push({
            id: randomId(), // Generates a unique transaction ID
            from_friend: item.friend,
            to_friend: bin.friend,
            amount: item_amount.toFixed(2), // Rounds the amount to 2 decimal places
          });
          return; // Breaks the loop after assigning the transaction
        }
      }

      bins.forEach((bin) => {
        if (item_amount <= 0 || bin.amount <= 0) return;

        let amount;

        if (+item_amount.toFixed(1) >= +bin.amount.toFixed(1)) {
          // Similar logic to distribute amounts between multiple bins
          item_amount -= bin.amount;
          amount = bin.amount;
        } else {
          bin.amount -= item_amount;
          amount = item_amount;
        }

        result.push({
          id: randomId(), // Generates a unique transaction ID
          from_friend: item.friend,
          to_friend: bin.friend,
          amount: amount.toFixed(2), // Rounds the amount to 2 decimal places
        });
      });
    });

    return result; // Returns the resulting transactions
  }

  calculate_bins_and_items() {
    const total = this.calculate_total(); // Calculates the total expenses
    const total_people = this.calculate_people(); // Counts the number of people involved

    const individual_share = total / total_people; // Calculates individual share

    let bins = [];
    let items = [];

    this.expenses.forEach((exp) => {
      if (exp.amount > individual_share) {
        // If someone paid more than their share, they become a 'bin'
        bins.push({
          friend: exp.friend,
          amount: exp.amount - individual_share, // Calculates the excess amount
        });
      } else if (exp.amount < individual_share) {
        // If someone paid less than their share, they become an 'item'
        items.push({
          friend: exp.friend,
          amount: individual_share - exp.amount, // Calculates the deficit amount
        });
      }
    });

    return [bins, items]; // Returns bins and items
  }

  calculate_total() {
    // Calculates the total expenses
    return Object.values(this.expenses).reduce(
      (a, expense) => a + expense.amount,
      0
    );
  }

  calculate_people() {
    // Counts the number of people involved
    return this.expenses.length;
  }

  get_expenses() {
    // Returns the provided expenses
    return this.expenses;
  }

  get_total() {
    // Returns the total expenses
    return this.total;
  }
}

export default SplitPaymentCalcClass; // Exports the SplitPaymentCalcClass for use in other modules
