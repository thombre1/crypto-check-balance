async function fetchBalance() {
      const currency = document.getElementById("currency").value;
      const address = document.getElementById("address").value.trim();
      const balanceElement = document.getElementById("balance");
      
      if (!address) {
        balanceElement.textContent = "⚠️ Please enter an address";
        return;
      }

      try {
        let url, response, data, balance;

        if (currency === "btc") {
          url = `https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance`;
          response = await fetch(url);
          data = await response.json();
          balance = data.final_balance / 1e8; // satoshi → BTC
        }

        else if (currency === "sol") {
          url = `https://public-api.solscan.io/account/${address}`;
          response = await fetch(url);
          data = await response.json();
          balance = data.lamports / 1e9; // lamports → SOL
        }

        balanceElement.textContent = `${balance} ${currency.toUpperCase()}`;
      } catch (err) {
        balanceElement.textContent = "❌ Error: " + err.message;
      }
    }