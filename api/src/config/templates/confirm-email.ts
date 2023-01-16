
export const templateSendCodeConfirm = (code) => {
	return String.raw`
	<div>
		<h3>Bonjour</h3>
		<p>Voici votre code de verfication </p>
		<div style="display:flex; justify-content: center; align-items: center">
			<span style="padding: 10px; font-size: white;
				border-radius: 5px;
	    font-weight: 600;
	    background: -webkit-linear-gradient(
	      top left,
	      var(--ion-color-primary),
	      var(--ion-color-secondary)
	    );
	    -webkit-background-clip: text;
	    -webkit-text-fill-color: transparent;">
				${code}
			</span>
		</div>
		<p>Equipe de pi-varotra vous remercie </p>
	</div>`
}