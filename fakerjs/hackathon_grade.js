import { faker } from '@faker-js/faker';
import fs from 'fs';

function generateUsers() {
    let insert = "INSERT INTO candidate_grade(grade, id_candidate, id_test) VALUES \n";
    let nombre = 1200;

    for (let id = 1; id <= nombre; id++) {
        let id_candidate,id_test;
        let grade = Math.round(Math.random() * 18 + 1);
        if (id <=150) {
            id_candidate = id;
            id_test = 1;
        } else if (id <=300){
            id_candidate = id-150;
            id_test = 2;
        } 
        else if (id <=450){
            id_candidate = id-150;
            id_test = 3;
        } else if (id <=600){
            id_candidate = id-300;
            id_test = 4;

        } 
        else if (id <=750){
            id_candidate = id-300;
            id_test = 5;
        } else if (id <=900){
            id_candidate = id-450;
            id_test = 6;
        } 
        else if (id <=1050){
            id_candidate = id-450;
            id_test = 7;
        } else if (id <=1200){
            id_candidate = id-600;
            id_test = 8;
        };

        if (id == nombre) {
            insert = insert.concat("(" + "'" + grade + "'," + "'" + id_candidate + "'," + "'" + id_test + "'"+ ");")
        } else {
            insert = insert.concat("(" + "'" + grade + "'," + "'" + id_candidate + "'," + "'" + id_test + "'"+ "),\n")
        }
    }
    return { "data": insert }
}

let dataObj = generateUsers();
//console.log(dataObj);
console.log(dataObj.data);
fs.writeFileSync('hackathon_grade.sql', dataObj.data);