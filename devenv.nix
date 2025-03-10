{ pkgs, ... }:

{
	packages = with pkgs; [
		pnpm
		nodejs_23
		nodePackages."@angular/cli"
	];
}
