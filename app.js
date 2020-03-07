// patient class: Represents a book
class Patient {
  constructor (name, location, id, notes) {
    this.id = id
    this.name = name
    this.location = location
    this.notes = notes
  }
}
// UI class: Handle UI Tasks
class UI {
  static displayPatients () {
    const patients = Store.getPatients()

    patients.forEach((patient) => UI.addpatientToList(patient))
  }
  static addpatientToList (patient) {
    const list = document.querySelector('#patient-list')
    const add = document.querySelector('#patient-list')

    const row = document.createElement('tr')

    row.innerHTML = `
        <td>${patient.id}</td>
        <td>${patient.name}</td>
        <td>${patient.location}</td>
        <td>${patient.notes}</td>
        <td><a href="#" class='btn btn-med 
        delete'>❌</td>
        `
    list.appendChild(row)
    add.appendChild(row)
  }

  static deletepatient (el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove()
    }
  }

  static showAlert (message, className) {
    const div = document.createElement('div')
    div.className = `alert alert-${className}`
    div.appendChild(document.createTextNode(message))
    const container = document.querySelector('.container')
    const form = document.querySelector('#patient-form')
    container.insertBefore(div, form)

    // Alert Disappers in 3 secs
    setTimeout(() => document.querySelector('.alert').remove(), 3000)
  }

  static clearFields () {
    document.querySelector('#name').value = ''
    document.querySelector('#location').value = ''
    document.querySelector('#id').value = ''
    document.querySelector('#notes').value = ''
  }
}
// Store Class: Handles Storage
class Store {
  static getpatients (ev) {
    let patients
    if (localStorage.getItem('patients') === null) {
      patients = []
    } else {
      patients = JSON.parse(localStorage.getItem('patients'))
    }
    return patients
  }

  static addpatient (patient) {
    const patients = Store.getpatients()
    patients.push(patient)
    localStorage.setItem('patients', JSON.stringify(patients))
  }

  static getPatientDetails (list) {
    list = JSON.parse(localStorage.getItem('patients'))
    list.appendChild('#patient-list')
  }

  static removepatient (location) {
    const patients = Store.getpatients()
    patients.forEach((patient, location) => {
      if (patient.location === location) {
        patients.splice(location, 1)
      }
    })
    localStorage.setItem('patients', JSON.stringify(patients))
  }
}
// Event: Display patients
document.addEventListener('DOMContentLoaded', UI.displaypatients)
// Event: Add a patient
document.querySelector('#patient-form').addEventListener('submit', (e) => {
  e.preventDefault()
  // Get the values of new patient to Add to list
  const name = document.querySelector('#name').value
  const location = document.querySelector('#location').value
  const id = document.querySelector('#id').value
  const notes = document.querySelector('#notes').value
  // Validate all fields
  if (name === '' || location === '' || id === '' ) {
    // Insert patient alert
    UI.showAlert('You havn\'t filled in all fields', 'danger')
  } else {
    // Instatiate patient
    const patient = new Patient(name, location, id, notes)

    // Adds new patient to UI
    UI.addpatientToList(patient)

    // Add patient to storage
    Store.addpatient(patient)

    // Show success message
    UI.showAlert('patient added', 'success')
    // Clear field values after submitting
    UI.clearFields()
  }
})

// Event: Remove a patient
document.querySelector('#patient-list').addEventListener('click', (e) => {
  // Remove patient from list
  UI.deletepatient(e.target)
  // Remove patient from store
  Store.removepatient(e.target.parentElement.previousElementSibling.textContent)
  // Show alert patient deleted
  UI.showAlert('patient deleted', 'success')
})
