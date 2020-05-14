import mysql from 'mysql';
import config from '../config';

//创建连接池
const pool = mysql.createPool(config.dbConfig);

export function query (sql: string, params?: Array<any>) {
    // eslint-disable-next-line no-undef
    return new Promise((resolve, reject) => {
        //取出链接
        pool.getConnection(function (err: any, connection) {
            //捕获错误并返回
            if (err) {
                reject(err);
                return;
            }

            connection.query(sql, params, function(error, results) {
                console.log(`${ sql } => ${ params }`);
                //释放连接
                connection.release();
                if (error) {
                    reject(error);
                    return;
                }
                //返回结果
                resolve(results);
            })

        })
    })
}