import { TaskProps } from '@types/TaskProps';
import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('letsgodriver.db');


const CREATE_PLANNING_TABLE_QUERY = "create table if not exists plannings (id text primary key not null, data text);"
const INSERT_PLANNING_QUERY = "insert into plannings (id, data) values (?,?);";


export const initDatabase = () => {

	db.transaction(tx => {
		tx.executeSql(CREATE_PLANNING_TABLE_QUERY);
	});

}



export const savePlanningEntity = (entity: TaskProps) => {

	db.transaction(tx => {

		tx.executeSql(CREATE_PLANNING_TABLE_QUERY);

		tx.executeSql(INSERT_PLANNING_QUERY,

			[entity!.id! , JSON.stringify(entity)]
			,
			(result, resultSet) => { console.log(resultSet) }
			,
			(result, error) => { console.log(error); return true }
		);

	});

}


export const deleteAllEntity = () => {

	return new Promise<void>((resolve, reject) => {
		
		db.transaction(tx => {
	
			tx.executeSql(
				"delete from plannings;"
				,
				[]
				,
				(result, resultSet) => { resolve() }
				,
				(result, error) => { console.log(error); return true }
			);
	
		});
	})

}


 

type Row = {

	id: string;
	data: string;
}


type ConvertRowToObjectProps = {

	rows: Row[]
}


const convertRowToObject = <T>({ rows }: ConvertRowToObjectProps) => {

	const result = new Array<T>();

	rows.map(row => {

		result.push(JSON.parse(row.data) as T)
	})

	return result;
}


const convertRowToTaskObject = (props : ConvertRowToObjectProps) => {

	return convertRowToObject<TaskProps>(props); 
}



export const retrieveTasks = () => {

	return new Promise<TaskProps[]>((resolve, reject) => {

		db.transaction(tx => {

			tx.executeSql(
				"select * from notifications;"
				,
				undefined
				,
				(result, resultSet) => { return resolve(convertRowToTaskObject({ rows: resultSet.rows._array as Row[] })); }
			);

		});


	})



}
 



export const clearDatabase = () => {

	return new Promise<void>((resolve, reject) => {

		db.transaction(tx => {
		
			tx.executeSql(
				"delete from plannings;"
			);	
		},
		reject,
		resolve
		);
		
	})



}



