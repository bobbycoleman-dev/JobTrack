const ApplicationTable = ({ appsList }) => {
	return (
		<div>
			<table className="table table-zebra thble-pin-rows">
				<thead>
					<tr>
						<th>Company</th>
						<th>Position</th>
						<th>Company Website</th>
						<th>Position Website</th>
						<th>Location</th>
						<th>Type</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{appsList &&
						appsList.map((app, idx) => {
							return (
								<tr key={idx}>
									<td>{app.companyName}</td>
									<td>{app.positionTitle}</td>
									<td>
										<a href={app.companyWebsite} target="_blank">
											{app.companyWebsite}
										</a>
									</td>
									<td>
										<a href={app.applicationWebsite} target="_blank">
											{app.applicationWebsite}
										</a>
									</td>
									<td>{app.location}</td>
									<td>{app.type}</td>
									<td>{app.status}</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
};

export default ApplicationTable;
