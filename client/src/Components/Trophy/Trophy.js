import React, { Component } from 'react';

export default class Trophy extends Component {
	render() {
		const { trophyName, description, points, hasAchieved } = this.props;
		const trophyDescription = description
			? description
			: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo doloribus officia ipsam beatae.';

		const viewPoints = points
			? `+${points}`
			: `+${Math.round(Math.random() * 100)}`;

		const hasAchievedStyle = hasAchieved
			? `trophy--achieved`
			: '';
		return (
			<div className={`trophy ${hasAchievedStyle}`}>
				<div className="trophy__container">
					<div className="trophy__graphic">
						<div className="trophy__hexagon">
							<div className="trophy__hex">
								<div className="trophy__halfA"></div>
								<div className="trophy__halfB"></div>
							</div>
							<div className="trophy__icon"></div>
							<div className="trophy__point">{viewPoints}</div>
						</div>
					</div>
					<div className="trophy__content">
						<div className="trophy__title">{ trophyName }</div>
						<div className="trophy__description">{ trophyDescription }</div>
						<div className="trophy__achieved"></div>
					</div>
				</div>
			</div>
		)
	}
}
