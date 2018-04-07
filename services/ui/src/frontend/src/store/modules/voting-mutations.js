export default {
  [types.ADD_CHOICE](state, choiceObj) {
    state.choices = [...state.choices, choiceObj];
  },
  [types.UPDATE_CHOICE](state, choice) {
    state.currentChoice = choice;
  },
  [types.UPDATE_CHOICE_VOTES](state, choiceObj) {
    state.choices = state.choices.map((choice) => (
      choice.choiceName !== choiceObj.choiceName ? choice : choiceObj
    ));
  },
  [types.SUBMIT_CHOICE_SENT](state) {
    state.submitSENT = true;
  },
  [types.SUBMIT_CHOICE_CLEARED](state) {
    state.submitSENT = false;
    state.currentChoice = '';
  },
  [types.SUBMIT_CHOICE_ERROR](state, error) {
    state.submitSENT = false;
    state.currentChoice = '';
    state.error = error;
  },
};
