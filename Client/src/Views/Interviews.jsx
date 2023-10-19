import { Calendar, Whisper, Popover, Badge } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";

function getTodoList(date) {
	const day = date.getDate();

	switch (day) {
		case 10:
			return [{ time: "10:30 am", title: "Acme" }];
		case 15:
			return [{ time: "09:30 pm", title: "ABC Co" }];
		default:
			return [];
	}
}

const Interviews = () => {
	function renderCell(date) {
		const list = getTodoList(date);
		const displayList = list.filter((item, index) => index < 2);

		if (list.length) {
			const moreCount = list.length - displayList.length;
			const moreItem = (
				<li>
					<Whisper
						placement="top"
						trigger="click"
						speaker={
							<Popover>
								{list.map((item, index) => (
									<p key={index}>
										<b>{item.time}</b> - {item.title}
									</p>
								))}
							</Popover>
						}>
						<a>{moreCount} more</a>
					</Whisper>
				</li>
			);

			return (
				<ul className="calendar-todo-list">
					{displayList.map((item, index) => (
						<li key={index}>
							<Badge /> <b>{item.time}</b> - {item.title}
						</li>
					))}
					{moreCount ? moreItem : null}
				</ul>
			);
		}

		return null;
	}

	return (
		<div>
			<p className="text-center text-6xl mb-12">Scheduled Interviews</p>
			<Calendar bordered renderCell={renderCell} />
		</div>
	);
};

export default Interviews;
