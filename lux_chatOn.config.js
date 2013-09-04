 /*!
 * lux_chatOn.config.js
 * This file contains the code for the Filter controls.
 * 
 * @project   lux_chatOn
 * @date      2012-12-20 
 * @author    SapientNitro
 * @client    Unilever
 *
 */

/*jslint sloppy: true */

/*global FB:false, jQuery, window, document*/

(function (lux_chatOn, undefined) {
	lux_chatOn.config = {
		language : 'english',
		debug: true,
        subTabIndex : {
            first : 'aVNVintage',
            second : 'aVNGlamour',
            third : 'aVNWhite'
        },
		applicationPage: {
            VoteNow : '0',
            Winners : '1'
        },     
        voteForCount : '5',    
        campaignState : {
            PhaseHowToEnter : '0',
            PhaseGetInspiredVintageClassic : '1',
            PhaseGetInspiredBewitchinglyGlamourous : '2',
            PhaseGetInspiredDazzlingWhite : '3',
            PhaseVoteNowVintageClassic : '4',
            PhaseVoteNowBewitchinglyGlamourous : '5',
            PhaseGetInspiredDazzlingWhite1 : '31',
            PhaseVoteNowDazzlingWhite : '6',
            PhaseWinPrizes : '7',
            PhaseWinners : '8'
        },
        campaignStateClass: 'campaignState',
        heightHTEnter: '1219',
        heightGInspired : '1315',
        heightVoteNow: '1450',
        handledFlag: '$#',
        footerLinks : {
            privacy : 'Privacy Policy',
            terms : 'Terms & Conditions'
        },
        button : {
        	vote : 'lux it'
        },
        carousel : {
            max : '6',
            vImages : ['vc_1_thumb.jpg', 'vc_2_thumb.jpg', 'vc_3_thumb.jpg', 'vc_4_thumb.jpg', 'vc_5_thumb.jpg', 'vc_6_thumb.jpg'],
            gImages : ['gc_1_thumb.jpg', 'gc_2_thumb.jpg', 'gc_3_thumb.jpg', 'gc_4_thumb.jpg'],
            wImages : ['wc_1_thumb.jpg', 'wc_2_thumb.jpg', 'wc_3_thumb.jpg', 'wc_4_thumb.jpg', 'wc_5_thumb.jpg'],
            imgPath : 'resources/images/getInspired/'
        },
		scripts : {
			touchScroll : '../../resources/js/lib/touch-scroll.js'
		}
	};

/**
 * Check to evaluate whether 'lux_chatOn' exists in the global namespace - if not, assign window.lux_chatOn an object literal.
 */
}(window.lux_chatOn = window.lux_chatOn || {}, jQuery));