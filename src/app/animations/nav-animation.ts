import { Animation, AnimationController } from "@ionic/angular";

export const enterAnimation = (baseEl: HTMLElement, opts?: any): Animation => {
	const DURATION = 300;

	const animationCtrl = new AnimationController();

	if (opts.direction === 'forward') {
		console.log('direction - ', opts.direction);
		console.log('opts.enteringEl', opts.enteringEl);
		console.log('opts.leavingEl', opts.leavingEl);

		return animationCtrl
			.create()
			.addElement(opts.enteringEl)
			.duration(DURATION)
			.fromTo('transform', 'translateX(400px)', 'translateX(0px)');
	} else {
		console.log('direction - ', opts.direction);
		const rootAnimation = animationCtrl
			.create()
			.addElement(opts.enteringEl)
			.duration(DURATION)
			.fromTo('transform', 'translateX(-400px)', 'translateX(0px)');
		const leavingAnimation = animationCtrl
			.create()
			.addElement(opts.leavingEl)
			.duration(DURATION)
			.fromTo('transform', 'translateX(-400px)', 'translateX(0px)');
		return animationCtrl
			.create()
			.addAnimation([rootAnimation, leavingAnimation]);
	}
};