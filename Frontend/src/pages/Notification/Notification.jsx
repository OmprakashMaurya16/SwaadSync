import React, { useState, useEffect } from "react";
import "./Notification.css";

const recipeSuggestions = [
	{
		title: "Try this trending Pasta!",
		image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
		description: "Creamy Alfredo pasta is trending this week. Give it a try!",
	},
	{
		title: "Spicy Paneer Tikka",
		image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
		description: "Paneer Tikka is loved by 1200+ users. Cook it now!",
	},
];

const pinterestNotifications = [
	{
		type: "save",
		message: "Your recipe 'Chocolate Cake' was saved by 5 users.",
		time: "2h ago",
	},
	{
		type: "view",
		message: "Your post 'Mango Lassi' got 20 new views.",
		time: "5h ago",
	},
	{
		type: "suggestion",
		message: "Check out trending recipes similar to your 'Paneer Butter Masala'.",
		time: "1d ago",
	},
];


function Notification() {
	const [notifications, setNotifications] = useState([]);

	useEffect(() => {
		setNotifications(pinterestNotifications);
	}, []);

	return (
		<div className="ss-notification-root">
			<header className="ss-notification-header">
				<h1>Notifications</h1>
				<p className="ss-notification-sub">Get recipe suggestions, post views & more!</p>
			</header>
			<section className="ss-notification-suggestions">
				<h2>Recipe Suggestions</h2>
				<div className="ss-notification-suggestion-cards">
					{recipeSuggestions.map((item, idx) => (
						<div className="ss-notification-suggestion-card" key={idx}>
							<img src={item.image} alt={item.title} />
							<div className="ss-notification-suggestion-info">
								<h3>{item.title}</h3>
								<p>{item.description}</p>
							</div>
						</div>
					))}
				</div>
			</section>
			<section className="ss-notification-list-section">
				<h2>Your Notifications</h2>
				<ul className="ss-notification-list">
					{notifications.map((note, idx) => (
						<li className={`ss-notification-item ${note.type}`} key={idx}>
							<span className="ss-note-message">{note.message}</span>
							<span className="ss-note-time">{note.time}</span>
						</li>
					))}
				</ul>
			</section>
		</div>
	);
}

export default Notification;
