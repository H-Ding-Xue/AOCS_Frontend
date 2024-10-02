import type { Trip } from './Trips';

export class Pilot {
	constructor(pilot_first_name: string, pilot_last_name: string) {
		this.pilot_first_name = pilot_first_name;
		this.pilot_last_name = pilot_last_name;
	}

	pilot_id!: number;

	pilot_first_name!: string;

	pilot_last_name!: string;

	trips!: Trip[];
}
