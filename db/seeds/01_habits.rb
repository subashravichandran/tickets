# db/seeds/habits.rb

Habit.find_or_create_by!(name: 'Exercise', streak: 0)
Habit.find_or_create_by!(name: 'Reading', streak: 1)
Habit.find_or_create_by!(name: 'Meditation', streak: 2)