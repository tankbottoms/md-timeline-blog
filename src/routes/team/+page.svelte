<svelte:head>
	<title>Team - My Research Blog</title>
</svelte:head>

<div class="page-wrapper">
<div class="team">
	<h1>Team</h1>

	<p>
		Our team brings together expertise from various domains to push the boundaries of research
		and innovation.
	</p>

	<h2 class="section-title">Leadership</h2>
	<div class="team-grid">
		<div class="team-member">
			<div class="member-name">Dom Cobb</div>
			<div class="member-role">Chief Executive Officer</div>
		</div>

		<div class="team-member">
			<div class="member-name">Bruce Wayne</div>
			<div class="member-role">Chief Technology Officer</div>
		</div>

		<div class="team-member">
			<div class="member-name">Cooper</div>
			<div class="member-role">Chief Science Officer</div>
		</div>
	</div>

	<h2 class="section-title">Core Team</h2>
	<div class="team-grid">
		<div class="team-member">
			<div class="member-name">Arthur</div>
			<div class="member-role">Head of Engineering</div>
		</div>

		<div class="team-member">
			<div class="member-name">Ariadne</div>
			<div class="member-role">Lead Architect</div>
		</div>

		<div class="team-member">
			<div class="member-name">Leonard Shelby</div>
			<div class="member-role">Director of Research</div>
		</div>

		<div class="team-member">
			<div class="member-name">Robert Angier</div>
			<div class="member-role">Head of Innovation</div>
		</div>

		<div class="team-member">
			<div class="member-name">Alfred Borden</div>
			<div class="member-role">Senior Engineer</div>
		</div>

		<div class="team-member">
			<div class="member-name">Neil</div>
			<div class="member-role">Systems Architect</div>
		</div>

		<div class="team-member">
			<div class="member-name">Teddy Daniels</div>
			<div class="member-name-label">Teddy Daniels</div>
			<div class="member-role">Security Lead</div>
		</div>

		<div class="team-member">
			<div class="member-name">Eames</div>
			<div class="member-role">Design Lead</div>
		</div>

		<div class="team-member">
			<div class="member-name">Murph Cooper</div>
			<div class="member-role">Data Scientist</div>
		</div>

		<div class="team-member">
			<div class="member-name">Alfred Pennyworth</div>
			<div class="member-role">Operations Manager</div>
		</div>

		<div class="team-member">
			<div class="member-name">Lucius Fox</div>
			<div class="member-role">Technology Advisor</div>
		</div>

		<div class="team-member">
			<div class="member-name">Robert Fischer</div>
			<div class="member-role">Business Development</div>
		</div>
	</div>

	<h2 class="section-title">Advisors</h2>
	<div class="team-grid">
		<div class="team-member">
			<div class="member-name">Professor Brand</div>
			<div class="member-role">Scientific Advisor</div>
		</div>

		<div class="team-member">
			<div class="member-name">Miles</div>
			<div class="member-role">Strategic Advisor</div>
		</div>

		<div class="team-member">
			<div class="member-name">Yusuf</div>
			<div class="member-role">Technical Advisor</div>
		</div>
	</div>

	<p class="join-us">
		If you are interested in joining our team, please visit our <a href="/about">about page</a> for
		more information.
	</p>
</div>
</div>

<style>
	.page-wrapper {
		max-width: 600px;
		margin: 0 auto;
	}

	.team {
		padding: 2rem 0;
	}

	.team h1 {
		font-family: var(--font-serif);
		margin-bottom: 1.5rem;
		color: var(--color-text);
	}

	.team p {
		margin: 1rem 0;
		line-height: 1.6;
		color: var(--color-text);
	}

	.section-title {
		font-weight: 600;
		margin-top: 2.5rem;
		margin-bottom: 1.5rem;
		color: var(--color-text);
	}

	.team-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.team-member {
		padding: 1rem;
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: 5px;
		transition: all 0.2s;
	}

	.team-member:hover {
		border-color: var(--color-border-dark);
		box-shadow: 2px 2px 0px var(--color-shadow);
	}

	.member-name {
		font-weight: 600;
		margin-bottom: 0.25rem;
		color: var(--color-text);
	}

	.member-role {
		font-size: 0.875rem;
		color: var(--color-text-muted);
	}

	.join-us {
		margin-top: 2rem;
		padding-top: 2rem;
		border-top: 1px solid var(--color-border);
	}

	.join-us a {
		color: var(--color-link);
		text-decoration: underline;
	}

	@media (max-width: 640px) {
		.team-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
