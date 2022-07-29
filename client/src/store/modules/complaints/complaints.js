import * as types from './complaint-types';
import events from '../../../plugins/events';
import interceptor from '../../../plugins/interceptor';

const state = {
  count: 0,
  complaint: null,
  complaints: [],
};

const getters = {
  [types.GET_COMPLAINT_COUNT]: (state) => state.count,
  [types.GET_COMPLAINT_DETAIL]: (state) => state.complaint,
  [types.GET_ALL_COMPLAINTS]: (state) => state.complaints,
};

const mutations = {
  [types.SET_COMPLAINT_DETAIL]: (state, payload) => {
    state.complaint = payload;
  },
  [types.SET_ALL_COMPLAINTS]: (state, payload) => {
    state.complaints = payload;
  },
  [types.SET_COMPLAINT_COUNT]: (state, payload) => {
    state.count = payload;
  },
};

const actions = {
  // Create Complaint Action
  [types.CREATE_COMPLAINT_ACTION]: ({ commit }, payload) => {
    const url = '/complaints';
    interceptor
      .post(url, payload)
      .then((response) => {
        if (response) {
          events.emit('add_toast', {
            content: 'Complaint added successfully',
            type: 'success',
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // Setting all COMPLAINTS
  [types.GET_ALL_COMPLAINTS_ACTION]: ({ commit }, urlParams) => {
    const url = '/complaints';
    interceptor.get(url, {
      params: urlParams,
    })
      .then((response) => {
        commit(types.SET_ALL_COMPLAINTS, response.complaints);
        commit(types.SET_COMPLAINT_COUNT, response.count);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // Set single complaint data
  [types.GET_COMPLAINT_DETAIL_ACTION]: ({ commit }, id) => {
    const url = `/complaints/${id}`;
    interceptor
      .get(url)
      .then((response) => {
        commit(types.SET_COMPLAINT_DETAIL, response.complaint);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // Delete a complaint
  [types.DELETE_COMPLAINT_ACTION]: ({ commit }, id) => {
    const url = `/complaints/${id}`;
    interceptor
      .delete(url)
      .then((response) => {
        if (response) {
          events.emit('add_toast', {
            content: 'Complaint deleted successfully',
            type: 'success',
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // Update a complaint
  [types.UPDATE_COMPLAINT_ACTION]: ({ commit }, payload) => {
    const url = `/complaints/${payload._id}`;
    interceptor
      .patch(url, payload)
      .then((response) => {
        if (response) {
          events.emit('add_toast', {
            content: 'Complaint updated successfully',
            type: 'success',
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};