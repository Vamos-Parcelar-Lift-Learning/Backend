import Bill from '../schemas/Bill';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const faker = require('faker-br');

function billSeed(): Bill[] {
  const billList: Bill[] = [];
  const billTypeParams = [
    'Água',
    'Energia',
    'Internet',
    'Celular',
    'Cartão de crédito',
  ];
  const billNumber = faker.random.number({ min: 1, max: 15 });

  for (let it = 0; it < billNumber; it += 1) {
    const billType: string = billTypeParams[Math.ceil(Math.random() * 5) - 1];

    const billDict: Bill = {
      code: String(Math.floor(Math.random() * 1000000000000)),
      name: billType,
      description: `Conta de ${billType}`,
      issuer: faker.company.companyName(),
      // eslint-disable-next-line @typescript-eslint/camelcase
      expiration_date: faker.date.between('2020-11-01', '2020-12-31'),
      amount: faker.random.number({ min: 50, max: 200 }),
    };

    billList.push(billDict);
  }

  return billList;
}

export default billSeed;
