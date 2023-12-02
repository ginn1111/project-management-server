import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SEND_GRID_API_KEY as string);

const TEMPLATES = {
	assignWork: "d-cb4342f2e943482c9b588a5b374bb7bd",
};

export const sendMail = ({
	subject,
	to,
	templateData,
}: {
	subject: string;
	to: string;
	templateData: Record<string, string>;
}) => {
	const msg = {
		to,
		from: "vanthuanjw@gmail.com", // Change to your verified sender
		subject,
		templateId: TEMPLATES.assignWork,
		dynamic_template_data: { data: templateData },
	};
	sgMail.send(msg);
};
