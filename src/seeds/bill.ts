
var faker = require('faker-br');
import Bill from '../schemas/Bill';

function billSeed(): Bill[] {

  const billList: Bill[] = [];
  const billTypeParams = ['Água', 'Energia', 'Internet', 'Celular', 'Cartão de crédito'];
  const billNumber = faker.random.number({ min: 1, max: 15})

  for (var it = 0; it < billNumber; it += 1) {

    var billType: string = billTypeParams[Math.ceil(Math.random() * 5) - 1];

    var billDict: Bill = {
      'id': 123,
      'code': String(Math.floor(Math.random()*1000000000000)),
      'name': billType,
      description: 'Conta de ' + billType,
      issuer: faker.company.companyName(),
      expiration_date: faker.date.between('2020-11-01', '2020-12-31'),
      amonut: faker.random.number({min: 50, max: 200})
    };

    billList.push(billDict);
  }

  return billList;
}

export default billSeed;
