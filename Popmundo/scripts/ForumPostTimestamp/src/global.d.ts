import moment from 'moment';
import jQuery from 'jquery';

declare global {
    interface Window {
      moment: typeof moment;
      jQuery: jQuery;
    }
  }

  declare namespace ${
    interface Test{}
  }