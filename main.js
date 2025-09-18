let contacts = [];
  const contactForm = document.getElementById("contact-form");
  const contactList = document.getElementById("contact-list");
  const searchInput = document.getElementById("search");
  const searchBtn = document.querySelector(".search-btn");
  const letterStats = document.getElementById("letter-stats");

  function renderContacts(list) {
    contactList.innerHTML = "";
    list.forEach(contact => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${contact.name}</td>
        <td>${contact.email}</td>
        <td>${contact.phone}</td>
      `;
      contactList.appendChild(row);
    });
    renderLetterStats();
  }
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const newContact = { name, email, phone };
    contacts.push(newContact);

    renderContacts(contacts);
    contactForm.reset();
  });

  searchBtn.addEventListener("click", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = contacts.filter(contact =>
      contact.name.toLowerCase().includes(query)
    );
    renderContacts(filtered);
  });

  function countContactsByFirstLetter(letter) {
    letter = letter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().startsWith(letter)
    ).length;
  }

  function generateLetterStats() {
    const letterCounts = {};
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    
    for (let letter of alphabet) {
      letterCounts[letter] = 0;
    }
    
    contacts.forEach(contact => {
      const firstLetter = contact.name.toLowerCase().charAt(0);
      if (letterCounts.hasOwnProperty(firstLetter)) {
        letterCounts[firstLetter]++;
      }
    });
    
    return letterCounts;
  }

  function renderLetterStats() {
    const stats = generateLetterStats();
    letterStats.innerHTML = '';

    const lettersWithContacts = Object.entries(stats)
      .filter(([letter, count]) => count > 0)
      .sort(([a], [b]) => a.localeCompare(b));
    
    if (lettersWithContacts.length === 0) {
      letterStats.innerHTML = '<p class="no-stats">No contacts added yet</p>';
      return;
    }
    
    lettersWithContacts.forEach(([letter, count]) => {
      const statItem = document.createElement('div');
      statItem.className = 'stat-item';
      statItem.innerHTML = `
        <span class="letter">${letter.toUpperCase()}</span>
        <span class="count">${count}</span>
      `;
      letterStats.appendChild(statItem);
    });
  }
