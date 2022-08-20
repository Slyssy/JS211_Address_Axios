'use strict';
const axios = require('axios').default;
const { AssertionError } = require('assert');
const assert = require('assert');
const { Axios, AxiosError } = require('axios');

const getAddress = (url) => {
  // url = 'https://randomuser.me/api/?results=2';
  return axios
    .get(url)
    .then((response) => {
      const data = response.data;
      const contactArray = data.results;
      displayContacts(contactArray);
      // console.log(contactArray);
      return contactArray;
    })
    .catch((error) => console.log('Error:', error));
};

// # Function to display the contacts. This will accept an array of objects and will weill create new HTML using insertAdjacentHTML and string object literals and drilling down into each object as we iterate over the array of objects.
const displayContacts = (array) => {
  array.map((contact, index) => {
    // const thumbnail = contact.picture.thumb
    const firstName = contact.name.first;
    const lastName = contact.name.last;
    const gender = contact.gender;
    const email = contact.email;
    const phone = contact.phone;
    const mobile = contact.cell;
    const streetNumber = contact.location.street.number;
    const streetName = contact.location.street.name;
    const city = contact.location.city;
    const state = contact.location.state;
    const zip = contact.location.postcode;

    console.log(`${firstName} ${lastName} (${gender})
    email: ${email}
    phone: ${phone}
    mobile: ${mobile}
    street #: ${streetNumber} street name: ${streetName}
    city: ${city} state: ${state} zip: ${zip}
    `);
  });
};

// getAddress();

// tests
if (typeof describe === 'function') {
  describe('getAddress()', () => {
    it('should fetch 2 users properly', async () => {
      let url = 'https://randomuser.me/api/?results=2';

      const res = await getAddress(url);
      assert.equal(res.length, 2);
    });
  });

  describe('catch', () => {
    it('should throw errors', async () => {
      assert.throws(() => {
        getAddress(url);
      }, Error);
    });
  });

  describe('displayContacts()', () => {
    it('It should display data', async () => {
      let url = 'https://randomuser.me/api/?results=2';

      const res = await getAddress(url);
      assert.notEqual(
        res.map((object) => object.name.first),
        null
      );
      assert.notEqual(
        res.map((object) => object.name.last),
        null
      );
      assert.notEqual(
        res.map((object) => object.gender),
        null
      );
      assert.notEqual(
        res.map((object) => object.email),
        null
      );
      assert.notEqual(
        res.map((object) => object.phone),
        null
      );
      assert.notEqual(
        res.map((object) => object.cell),
        null
      );
    });
  });

  // it('should add users to my address book', async () => {
  //   await fetch('https://randomuser.me/api/?results=20').then((res) => {
  //     if (!res.ok) {
  //       throw Error('Error');
  //     }
  //     return res.json().then((data) => {
  //       const displayUsers = data.results.map((person) => {
  //         addressBook = data.results;
  //       });
  //       assert.equal(addressBook.length, 20);
  //     });
  //   });
  // });
  // it('should show extra data on button click', () => {
  //   moreInfo = () => {
  //     let elems = document.getElementsByClassName('getInfo');
  //     while (elems.length > 0) {
  //       elems[0].classList.remove('getInfo');
  //     }
  //     assert.equal(elems.classList, none);
  //   };
  // });
}
