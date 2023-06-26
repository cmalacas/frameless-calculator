import Axios from "axios";

class Authservice {

    async uploadCSV( data  ) {

        try {

            const response = await Axios.post(qcAjax.ajaxurl, data)

            return response.data

        } catch ( error ) {

            return false;

        }
    }

    async getFixedPanel( data  ) {

      try {

          const response = await Axios.post(qcAjax.ajaxurl, data)

          return response.data

      } catch ( error ) {

          return false;

      }
    }

    async getHingedPanel( data  ) {

        try {
  
            const response = await Axios.post(qcAjax.ajaxurl, data)
  
            return response.data
  
        } catch ( error ) {
  
            return false;
  
        }
    }

    async getDoorPanel( data  ) {

        try {
  
            const response = await Axios.post(qcAjax.ajaxurl, data)
  
            return response.data
  
        } catch ( error ) {
  
            return false;
  
        }
    }

    async get90DegreeBracket( data  ) {

        try {
  
            const response = await Axios.post(qcAjax.ajaxurl, data)
  
            return response.data
  
        } catch ( error ) {
  
            return false;
  
        }
    }

    async get180DegreeBracket( data  ) {

        try {
  
            const response = await Axios.post(qcAjax.ajaxurl, data)
  
            return response.data
  
        } catch ( error ) {
  
            return false;
  
        }
    }

    async getDoorKnob( data  ) {

        try {
  
            const response = await Axios.post(qcAjax.ajaxurl, data)
  
            return response.data
  
        } catch ( error ) {
  
            return false;
  
        }
    }

    async getDoorSeal( data  ) {

        try {
  
            const response = await Axios.post(qcAjax.ajaxurl, data)
  
            return response.data
  
        } catch ( error ) {
  
            return false;
  
        }
    }

    async getGlassShelfBracket( data  ) {

        try {
  
            const response = await Axios.post(qcAjax.ajaxurl, data)
  
            return response.data
  
        } catch ( error ) {
  
            return false;
  
        }
    }

    async getGlassShelf( data  ) {

        try {
  
            const response = await Axios.post(qcAjax.ajaxurl, data)
  
            return response.data
  
        } catch ( error ) {
  
            return false;
  
        }
    }

    async getHalfRoundWaterBar( data  ) {

        try {
  
            const response = await Axios.post(qcAjax.ajaxurl, data)
  
            return response.data
  
        } catch ( error ) {
  
            return false;
  
        }
    }

    async getSilicone( data  ) {

        try {
  
            const response = await Axios.post(qcAjax.ajaxurl, data)
  
            return response.data
  
        } catch ( error ) {
  
            return false;
  
        }
    }

    async getSpatula( data  ) {

        try {
  
            const response = await Axios.post(qcAjax.ajaxurl, data)
  
            return response.data
  
        } catch ( error ) {
  
            return false;
  
        }
    }

    async get3mmPackers( data  ) {

        try {
  
            const response = await Axios.post(qcAjax.ajaxurl, data)
  
            return response.data
  
        } catch ( error ) {
  
            return false;
  
        }
    }

    async get6mmSpadePorcelainEaterDrill( data  ) {

        try {
  
            const response = await Axios.post(qcAjax.ajaxurl, data)
  
            return response.data
  
        } catch ( error ) {
  
            return false;
  
        }
    }

    async get_fixed_panels( data  ) {

        console.log('async', qcAjax.ajaxurl);

        try {
  
            const response = await Axios.post(qcAjax.ajaxurl, data)
  
            return response.data
  
        } catch ( error ) {
  
            return false;
  
        }
    }

    async addToCart( data  ) {

        try {
  
            const response = await Axios.post(qcAjax.ajaxurl, data)
  
            return response.data
  
        } catch ( error ) {
  
            return false;
  
        }
    }

     async get_2x_panel_inline_screen( data ) {

        try {
  
            const response = await Axios.post(qcAjax.ajaxurl, data)
  
            return response.data
  
        } catch ( error ) {
  
            return false;
  
        }


    }

    async get90DegreeWallToGlassHinge( data ) {

        try {
  
            const response = await Axios.post(qcAjax.ajaxurl, data)
  
            return response.data
  
        } catch ( error ) {
  
            return false;
  
        }


    }

    async get180DegreeWallToGlassHinge( data ) {

        try {
  
            const response = await Axios.post(qcAjax.ajaxurl, data)
  
            return response.data
  
        } catch ( error ) {
  
            return false;
  
        }


    }
}

export default new Authservice();