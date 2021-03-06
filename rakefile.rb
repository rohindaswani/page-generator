require 'aws-sdk'

namespace :assets do
  namespace :deploy do
    def exclude_all(patterns)
      patterns.reject(&:empty?).reject {|s| s =~ /^\s*#/ }.flat_map do |pattern|
        pattern += "/*" if File.directory? pattern
        ["--exclude", pattern]
      end
    end

    desc 'script to upload files to s3'
    task :all, :dir do |_, params|
      puts "uploading assets to s3"
      Dir.chdir('build')

      root_excludes = []
      if File.exist? ".s3exclude"
        root_excludes = File.open(".s3exclude").flat_map do |line|
          line.chomp!
          Dir["**/#{line}"]
        end
        root_excludes << ".s3exclude"
      end

      excludes_list = Dir["**/.s3ignore"].flat_map do |path|
        dir = File.dirname(path)
        if dir == '.'
          File.open(path).map(&:chomp)
        else
          File.open(path).map(&:chomp).map {|name| File.join(dir, name) }
        end
      end
      excludes_list << ".s3ignore"

      source = params.dir || "."
      destination = "s3://s3-assets.mercuryanalytics.com/pageviewer/"
      destination += params.dir if params.dir

      #TODO: use something smarter than sync to compare files
      cmd = %w[aws s3 sync --acl public-read]
      cmd += exclude_all(excludes_list)
      cmd += exclude_all(root_excludes)
      cmd << source
      cmd << destination
      system(*cmd)
      puts 'assets uploaded to s3'
    end
  end
end
