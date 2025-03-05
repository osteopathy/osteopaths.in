import type {
	ServiceAppointment,
	InsertServiceAppointment
} from "$lib/database/schema/service/provider/appointment";

export const serviceAppointment = {
	getAll: async () => {
		const res = await fetch(`/api/v1/appointment`);
		return res.json() as Promise<{
			data: ServiceAppointment[];
		}>;
	},
	get: async (id: string) => {
		const res = await fetch(`/api/v1/appointment?id=${id}`);
		return res.json() as Promise<{
			data: ServiceAppointment;
		}>;
	},
	new: async (values: InsertServiceAppointment) => {
		const res = await fetch("/api/v1/appointment/", {
			method: "POST",
			body: JSON.stringify(values)
		});
		return res.json() as Promise<{
			data: ServiceAppointment;
		}>;
	},
	put: async (id: string, values: Partial<Omit<ServiceAppointment, "id">>) => {
		const res = await fetch(`/api/v1/appointment?id=${id}`, {
			method: "PUT",
			body: JSON.stringify(values)
		});
		return res.json() as Promise<{
			data: ServiceAppointment;
		}>;
	},
	del: async (id: number) => {
		const res = await fetch(`/api/v1/appointment?id=${id}`, {
			method: "DELETE"
		});
		return res.json() as Promise<{
			data: ServiceAppointment;
		}>;
	}
};
