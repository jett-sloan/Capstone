const db = require('../db');
// Quote.js

class Quote {
  constructor(data) {
    if (data) {
      this.id = data.id;
      this.frontWindowsUpstairs = data.frontWindowsUpstairs;
      this.frontWindowsDownstairs = data.frontWindowsDownstairs;
      this.sideWindowsUpstairs = data.sideWindowsUpstairs;
      this.sideWindowsDownstairs = data.sideWindowsDownstairs;
      this.backWindowsUpstairs = data.backWindowsUpstairs;
      this.backWindowsDownstairs = data.backWindowsDownstairs;
      this.slidingDoors = data.slidingDoors;
      this.stories = data.stories;
      this.quoteAmount = data.quoteAmount;
      this.createdAt = data.createdAt;


      this.windowPrices = {
        frontWindowsUpstairs: 20,    
        frontWindowsDownstairs: 15,   
        sideWindowsUpstairs: 10,    
        sideWindowsDownstairs: 5,   
        backWindowsUpstairs: 15,    
        backWindowsDownstairs: 10,   
        slidingDoors: 15            
      };
    }
    this.calculateQuoteAmount();
    
  }
  calculateQuoteAmount() {
    this.quoteAmount = (
      this.frontWindowsUpstairs * this.windowPrices.frontWindowsUpstairs +
      this.frontWindowsDownstairs * this.windowPrices.frontWindowsDownstairs +
      this.sideWindowsUpstairs * this.windowPrices.sideWindowsUpstairs +
      this.sideWindowsDownstairs * this.windowPrices.sideWindowsDownstairs +
      this.backWindowsUpstairs * this.windowPrices.backWindowsUpstairs +
      this.backWindowsDownstairs * this.windowPrices.backWindowsDownstairs +
      this.slidingDoors * this.windowPrices.slidingDoors
    );
  }
  

  async save() {
    try {
      const query = `
        INSERT INTO quotes (
          frontwindowsupstairs,
          frontwindowsdownstairs,
          sidewindowsupstairs,
          sidewindowsdownstairs,
          backwindowsupstairs,
          backwindowsdownstairs,
          slidingdoors,
          stories,
          quotamount,
          createdat
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING id`;
      const values = [
        this.frontWindowsUpstairs,
        this.frontWindowsDownstairs,
        this.sideWindowsUpstairs,
        this.sideWindowsDownstairs,
        this.backWindowsUpstairs,
        this.backWindowsDownstairs,
        this.slidingDoors,
        this.stories,
        this.quoteAmount,
        this.createdAt
      ];
      const { rows } = await db.query(query, values);
      this.id = rows[0].id;
    } catch (error) {
      throw error;
    }
  }
  static async deleteAll() {
    try {
      await db.query('DELETE FROM quotes');
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Quote;


