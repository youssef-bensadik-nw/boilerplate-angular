{ pkgs, ... }:

{
	packages = with pkgs; [
		pnpm
		nodejs_22
		nodePackages."@angular/cli"
	];
}
