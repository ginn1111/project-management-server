import { generateId } from "./generate-id";

export const importData = () =>
	fetch("https://provinces.open-api.vn/api/?depth=3")
		.then((res) => res.json())
		.then(async (data) => {
			let districtMap: any = [];
			let wardMap: any = [];
			const provinces = data.map((p: any) => {
				const province = {
					id: generateId("PROV"),
					name: p.name,
					code: p.code,
				};

				districtMap.push(
					p.districts.map((d: any) => {
						const district = {
							id: generateId("DIST"),
							name: d.name,
							code: d.code,
							idProvince: province.id,
						};

						wardMap.push(
							d.wards.map((w: any) => ({
								id: generateId("WARD"),
								name: w.name,
								code: w.code,
								idDistrict: district.id,
							})),
						);

						return district;
					}),
				);

				return province;
			});

			// await primaClient.province.createMany({
			// 	data: provinces,
			// });
			// await primaClient.district.createMany({
			// 	data: districtMap.flat(),
			// });
			// await primaClient.ward.createMany({
			// 	data: wardMap.flat(),
			// });
		});
