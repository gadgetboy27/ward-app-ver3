// patient class: Represents a book
class Patient {
  constructor (name, room, gest, notes) {
    this.name = name
    this.room = room
    this.gest = gest
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
        <td>${patient.name}</td>
        <td>${patient.room}</td>
        <td>${patient.gest}</td>
        <td>${patient.notes}</td>
        <td><a href="#" class='btn btn-med 
        delete'>❌</td>
        <td><a href="#" class='btn btn-sml 
        update'>✅</td> 
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
    document.querySelector('#room').value = ''
    document.querySelector('#gest').value = ''
    document.querySelector('#notes').value = ''
  }
}
// Store Class: Handles Storage
class Store {
  static getpatients () {
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

  static getpatientDetails () {
    const list = JSON.parse(localStorage.getItem('patients'))
    if (list) {
      document.getElementById('list').value = list
    // console.log(list)
    }
  }

  static removepatient (room) {
    const patients = Store.getpatients()
    patients.forEach((patient, room) => {
      if (patient.room === room) {
        patients.splice(room, 1)
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
  const room = document.querySelector('#room').value
  const gest = document.querySelector('#gest').value
  const notes = document.querySelector('#notes').value
  // Validate all fields
  if (name === '' || room === '' || gest === '') {
    // Insert patient alert
    UI.showAlert('You havn\'t filled in all fields', 'danger')
  } else {
    // Instatiate patient
    const patient = new Patient(name, room, gest, notes)

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

document.addEventListener('DOMContentLoaded', UI.displaypatients)

document.querySelector('#patient-list').addEventListener('click', (el) => {
  // Remove patient from list
  UI.addpatientToList(el.target)
  // Remove patient from store
  Store.addpatient(el.target.parentElement.previousElementSibling.textContent)
  // Show alert patient deleted
  UI.showAlert('patient added', 'success')
})
