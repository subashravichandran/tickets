namespace :db do
  namespace :seed do
    desc 'load all seeds under db/seeds'
    task load_all: :environment do
      if Rails.env.test?
        Dir[Rails.root.join('db','seeds','*.rb')].sort.each do |seed_file|
          load(seed_file)
        end
        puts 'DB seeded successfully'
      else
        puts 'This task can only be ran in TEST environment'
      end
    end
  end
end