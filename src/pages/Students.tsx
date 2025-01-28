import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Student } from '../lib/types';
import { Plus, Eye, Edit, Trash2, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { clsx } from 'clsx';
import './student.css';


const studentSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  class: z.string().min(1, 'Class is required'),
  section: z.string().min(1, 'Section is required'),
  rollNumber: z.string().min(1, 'Roll number is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['male', 'female', 'other']),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  pincode: z.string().min(6, 'Valid pincode is required'),
  phoneNumber: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Valid email is required'),
  parentName: z.string().min(1, 'Parent name is required'),
  bloodGroup: z.string().min(1, 'Blood group is required'),
  admissionDate: z.string().min(1, 'Admission date is required'),
});

type StudentFormData = z.infer<typeof studentSchema>;

export function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema)
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const querySnapshot = await getDocs(collection(db, 'students'));
    const studentsList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Student[];
    setStudents(studentsList);
  };

  const onSubmit = async (data: StudentFormData) => {
    try {
      if (isEditModalOpen && selectedStudent) {
        await updateDoc(doc(db, 'students', selectedStudent.id), data);
      } else {
        await addDoc(collection(db, 'students'), data);
      }
      await fetchStudents();
      closeModals();
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteDoc(doc(db, 'students', id));
        await fetchStudents();
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  const closeModals = () => {
    setIsModalOpen(false);
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedStudent(null);
    reset();
  };

  const openEditModal = (student: Student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
    reset(student);
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Students Details</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn"
        >
          <Plus className="icon" />
          Add Student
        </button>
      </div>

      <div className="card">
        <table className="table">
          <thead className="table-header">
            <tr>
              <th className="table-cell">ID</th>
              <th className="table-cell">Name</th>
              <th className="table-cell">Class</th>
              <th className="table-cell">Section</th>
              <th className="table-cell">Roll Number</th>
              <th className="table-cell">Actions</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {students.map((student) => (
              <tr key={student.id}>
                <td className="table-cell">{student.id.slice(0, 8)}</td>
                <td className="table-cell">{student.name}</td>
                <td className="table-cell">{student.class}</td>
                <td className="table-cell">{student.section}</td>
                <td className="table-cell">{student.rollNumber}</td>
                <td className="table-cell">
                  <div className="actions">
                    <button
                      onClick={() => {
                        setSelectedStudent(student);
                        setIsViewModalOpen(true);
                      }}
                      className="action-btn"
                    >
                      <Eye className="icon" />
                    </button>
                    <button
                      onClick={() => openEditModal(student)}
                      className="action-btn"
                    >
                      <Edit className="icon" />
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="action-btn"
                    >
                      <Trash2 className="icon" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Student Modal */}
      {(isModalOpen || isEditModalOpen) && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">
                {isEditModalOpen ? 'Edit Student' : 'Add New Student'}
              </h2>
              <button onClick={closeModals} className="close-btn">
                <X className="icon" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="form">
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  {...register('name')}
                  className={clsx(
                    'form-input',
                    errors.name && 'input-error'
                  )}
                />
                {errors.name && (
                  <p className="error-message">{errors.name.message}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Class</label>
                <input
                  type="text"
                  {...register('class')}
                  className={clsx(
                    'form-input',
                    errors.class && 'input-error'
                  )}
                />
                {errors.class && (
                  <p className="error-message">{errors.class.message}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Section</label>
                <input
                  type="text"
                  {...register('section')}
                  className={clsx(
                    'form-input',
                    errors.section && 'input-error'
                  )}
                />
                {errors.section && (
                  <p className="error-message">{errors.section.message}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Roll Number</label>
                <input
                  type="text"
                  {...register('rollNumber')}
                  className={clsx(
                    'form-input',
                    errors.rollNumber && 'input-error'
                  )}
                />
                {errors.rollNumber && (
                  <p className="error-message">{errors.rollNumber.message}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  {...register('dateOfBirth')}
                  className={clsx(
                    'form-input',
                    errors.dateOfBirth && 'input-error'
                  )}
                />
                {errors.dateOfBirth && (
                  <p className="error-message">{errors.dateOfBirth.message}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Gender</label>
                <select
                  {...register('gender')}
                  className={clsx(
                    'form-input',
                    errors.gender && 'input-error'
                  )}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="error-message">{errors.gender.message}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Address</label>
                <textarea
                  {...register('address')}
                  rows={3}
                  className={clsx(
                    'form-input',
                    errors.address && 'input-error'
                  )}
                />
                {errors.address && (
                  <p className="error-message">{errors.address.message}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">City</label>
                <input
                  type="text"
                  {...register('city')}
                  className={clsx(
                    'form-input',
                    errors.city && 'input-error'
                  )}
                />
                {errors.city && (
                  <p className="error-message">{errors.city.message}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">State</label>
                <input
                  type="text"
                  {...register('state')}
                  className={clsx(
                    'form-input',
                    errors.state && 'input-error'
                  )}
                />
                {errors.state && (
                  <p className="error-message">{errors.state.message}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Pincode</label>
                <input
                  type="text"
                  {...register('pincode')}
                  className={clsx(
                    'form-input',
                    errors.pincode && 'input-error'
                  )}
                />
                {errors.pincode && (
                  <p className="error-message">{errors.pincode.message}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  {...register('phoneNumber')}
                  className={clsx(
                    'form-input',
                    errors.phoneNumber && 'input-error'
                  )}
                />
                {errors.phoneNumber && (
                  <p className="error-message">{errors.phoneNumber.message}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  {...register('email')}
                  className={clsx(
                    'form-input',
                    errors.email && 'input-error'
                  )}
                />
                {errors.email && (
                  <p className="error-message">{errors.email.message}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Parent Name</label>
                <input
                  type="text"
                  {...register('parentName')}
                  className={clsx(
                    'form-input',
                    errors.parentName && 'input-error'
                  )}
                />
                {errors.parentName && (
                  <p className="error-message">{errors.parentName.message}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Blood Group</label>
                <input
                  type="text"
                  {...register('bloodGroup')}
                  className={clsx(
                    'form-input',
                    errors.bloodGroup && 'input-error'
                  )}
                />
                {errors.bloodGroup && (
                  <p className="error-message">{errors.bloodGroup.message}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Admission Date</label>
                <input
                  type="date"
                  {...register('admissionDate')}
                  className={clsx(
                    'form-input',
                    errors.admissionDate && 'input-error'
                  )}
                />
                {errors.admissionDate && (
                  <p className="error-message">{errors.admissionDate.message}</p>
                )}
              </div>

              <div className="form-group">
                <button
                  type="submit"
                  className="btn"
                >
                  {isEditModalOpen ? 'Update Student' : 'Add Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Student Modal */}
      {isViewModalOpen && selectedStudent && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">Student Details</h2>
              <button onClick={closeModals} className="close-btn">
                <X className="icon" />
              </button>
            </div>

            <div className="form">
              <div className="form-group">
                <h3 className="form-label">Name</h3>
                <p>{selectedStudent.name}</p>
              </div>
              <div className="form-group">
                <h3 className="form-label">Class</h3>
                <p>{selectedStudent.class}</p>
              </div>
              <div className="form-group">
                <h3 className="form-label">Section</h3>
                <p>{selectedStudent.section}</p>
              </div>
              <div className="form-group">
                <h3 className="form-label">Roll Number</h3>
                <p>{selectedStudent.rollNumber}</p>
              </div>
              <div className="form-group">
                <h3 className="form-label">Date of Birth</h3>
                <p>{selectedStudent.dateOfBirth}</p>
              </div>
              <div className="form-group">
                <h3 className="form-label">Gender</h3>
                <p>{selectedStudent.gender}</p>
              </div>
              <div className="form-group">
                <h3 className="form-label">Address</h3>
                <p>{selectedStudent.address}</p>
              </div>
              <div className="form-group">
                <h3 className="form-label">City</h3>
                <p>{selectedStudent.city}</p>
              </div>
              <div className="form-group">
                <h3 className="form-label">State</h3>
                <p>{selectedStudent.state}</p>
              </div>
              <div className="form-group">
                <h3 className="form-label">Pincode</h3>
                <p>{selectedStudent.pincode}</p>
              </div>
              <div className="form-group">
                <h3 className="form-label">Phone Number</h3>
                <p>{selectedStudent.phoneNumber}</p>
              </div>
              <div className="form-group">
                <h3 className="form-label">Email</h3>
                <p>{selectedStudent.email}</p>
              </div>
              <div className="form-group">
                <h3 className="form-label">Parent Name</h3>
                <p>{selectedStudent.parentName}</p>
              </div>
              <div className="form-group">
                <h3 className="form-label">Blood Group</h3>
                <p>{selectedStudent.bloodGroup}</p>
              </div>
              <div className="form-group">
                <h3 className="form-label">Admission Date</h3>
                <p>{selectedStudent.admissionDate}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}