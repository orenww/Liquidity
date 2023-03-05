<template>  
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !name.isValid }">
      <label for="name">Name</label>
      <input
        :disabled="!this.data.isNew"
        type="text"
        id="name"
        v-model.trim="name.val"
        @blur="clearValidity('name')"
      />
      <p v-if="!name.isValid">Name must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !gender.isValid }">
      <label for="gender">Gender</label>
      <input
        type="text"
        id="gender"
        v-model.trim="gender.val"
        @blur="clearValidity('gender')"
      />
      <p v-if="!gender.isValid">Gender must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !birth_year.isValid }">
      <label for="birth_year">BIRTH YEAR</label>
      <input
        type="text"
        id="birth_year"
        rows="5"
        v-model.trim="birth_year.val"
        @blur="clearValidity('birth_year')"
      />
      <p v-if="!birth_year.isValid">Birth year must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !height.isValid }">
      <label for="height">Height</label>
      <input
        type="number"
        id="height"
        v-model.number="height.val"
        @blur="clearValidity('height')"
      />
      <p v-if="!height.isValid">Height must be greater than 0.</p>
    </div>
    <div class="form-control" :class="{ invalid: !mass.isValid }">
      <label for="height">Mass</label>
      <input
        type="number"
        id="mass"
        v-model.number="mass.val"
        @blur="clearValidity('mass')"
      />
      <p v-if="!height.isValid">Mass must be greater than 0.</p>
    </div>

    <p v-if="!formIsValid">Please fix the above errors and submit again.</p>
    <button class="btn-float-right">Save</button>
  </form>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.name.val = this.data?.data.name || "";
    this.gender.val = this.data.data.gender || "";
    this.birth_year.val = this.data.data.birth_year || "";
    this.height.val = this.data.data.height || "";
    this.mass.val = this.data.data.mass || "";        
  },
  emits: ["save-data"],
  data() {
    return {
      name: {
        val: "",
        isValid: true,
      },
      gender: {
        val: "",
        isValid: true,
      },
      birth_year: {
        val: "",
        isValid: true,
      },
      description: {
        val: "",
        isValid: true,
      },
      height: {
        val: null,
        isValid: true,
      },
      mass: {
        val: [],
        isValid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.name.val === "") {
        this.name.isValid = false;
        this.formIsValid = false;
      }
      if (this.gender.val === "") {
        this.gender.isValid = false;
        this.formIsValid = false;
      }
      if (this.birth_year.val === "") {
        this.birth_year.isValid = false;
        this.formIsValid = false;
      }
      if (!this.height.val || this.height.val < 0) {
        this.height.isValid = false;
        this.formIsValid = false;
      }
      if (!this.mass.val || this.mass.val < 0) {
        this.mass.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const formData = {
        name: this.name.val,
        gender: this.gender.val,
        birth_year: this.birth_year.val,
        height: this.height.val,
        mass: this.mass.val,
        isNew:this.data.isNew
      };

      this.$emit("save-data", formData);
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input {
  border: 1px solid red;
}

.btn-float-right{
	float: right;	
    margin: 15px;
}
</style>
