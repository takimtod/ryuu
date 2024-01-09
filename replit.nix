{ pkgs }: {
    deps = [              
        pkgs.nodejs-18_x
        pkgs.tesseract
	    	pkgs.nodePackages.typescript
        pkgs.libuuid
        pkgs.ffmpeg-full
        pkgs.ffmpeg
        pkgs.yarn
	   		pkgs.speedtest-cli
        pkgs.imagemagick  
        pkgs.wget
        pkgs.zip
			  pkgs.pm2
        pkgs.git
        pkgs.nodePackages.pm2
    ];
  env ={
    LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [pkgs.libuuid];
  };
}