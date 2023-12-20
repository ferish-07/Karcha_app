import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';

export default function SqlLite() {
  let db = openDatabase({name: 'AppData.db'});
  useEffect(() => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT * FROM sqlite_master WHERE type='table' AND name='Expense'",
        [],
        (tx, res) => {
          console.log(
            'item------------------------ada dnadadan d ad a dadadb:',
            res,
          );
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS Expense', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS Expense(id INTEGER PRIMARY KEY AUTOINCREMENT, category VARCHAR(100), amount DECIMAL(10,2), dateTime DATETIME, Note NVARCHAR(100), cashIn BOOLEAN)',
              [],
            );
          }
        },
      );
    });
    db.transaction(txn => {
      txn.executeSql(
        "SELECT * FROM sqlite_master WHERE type='table' AND name='CategoryMaster'",
        [],
        (tx, res) => {
          console.log(
            'item------------------------ada dnadadan d ad a dadadb:',
            res,
          );
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS Expense', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS CategoryMaster(id INTEGER PRIMARY KEY AUTOINCREMENT, category_name VARCHAR(100))',
              [],
              (tx, res) => {
                console.log('---------------RESSSSSS----------------');
              },
            );
          }
        },
      );
    });
  }, []);
}

const styles = StyleSheet.create({});
