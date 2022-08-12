import { faker } from '@faker-js/faker';
import fs from 'fs';

function generateUsers() {
    let insert = "INSERT INTO candidate(first_name, last_name, date_de_naissance, sexe, telephone, mail, serie) VALUES \n";
    let nombre = 600;

    for (let id = 1; id <= nombre; id++) {
        let x = Math.round(Math.random() * 1 + 1);
        let s = Math.round(Math.random() * 2 + 1);
        let serie;
        if (s==1) {
            serie = 'A'
        } else if (s==2) {
            serie = 'C'
        } else if (s==3) {
            serie = 'D'
        }
        let o = Math.round(Math.random() * 2 + 1);
        let op;
        if (o==1) {
            op = '032'
        } else if (o==2) {
            op = '033'
        } else if (o==3) {
            op = '034'
        }
        let tel = op + faker.random.numeric(7);
        let sex = x == 2 ? 'female' : 'male';
        let firstName = faker.name.firstName(sex).replace("'", "''");
        let lastName = faker.name.lastName(sex).replace("'", "''");
        let nickname = faker.internet.userName(firstName, lastName);
        let rawbirthday = faker.date.birthdate({ min: 16, max: 35, mode: 'age' });
        let birthday = `${rawbirthday.getFullYear()}-${rawbirthday.getMonth() < 9 ? "0" + (rawbirthday.getMonth() + 1) : (rawbirthday.getMonth() + 1)}-${rawbirthday.getDate() < 9 ? "0" + (rawbirthday.getDate()) : (rawbirthday.getDate())}`;
        let gender = sex == 'female' ? 'F' : 'M';
        let email = faker.internet.email(nickname+id,Math.round(Math.random() * 100));

        if (id == nombre) {
            insert = insert.concat("(" + "'" + firstName + "'," + "'" + lastName + "'," + "'" + birthday + "'," + "'" + gender + "'," + "'" + tel + "'," + "'" + email + "'," + "'" + serie + "'" + ");")
        } else {
            insert = insert.concat("(" + "'" + firstName + "'," + "'" + lastName + "'," + "'" + birthday + "'," + "'" + gender + "'," + "'" + tel + "'," + "'" + email + "'," + "'" + serie + "'" + "),\n")
        }
    }
    return { "data": insert }
}

let dataObj = generateUsers();
//console.log(dataObj);
console.log(dataObj.data);
fs.writeFileSync('hackathon_candidate.sql', dataObj.data);