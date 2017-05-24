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

      root_excludes = File.open(".s3exclude").flat_map do |line|
        line.chomp!
        Dir["**/#{line}"]
      end
      root_excludes << ".s3exclude"

      excludes_list = Dir["**/.s3ignore"].flat_map do |path|
        dir = File.dirname(path)
        if dir == '.'
          File.open(path).map(&:chomp)
        else
          File.open(path).map(&:chomp).map {|name| File.join(dir, name) }
        end
      end
      excludes_list << ".s3ignore"

      p excludes_list.join(' ')
      source = params.dir || "."
      destination = "s3://s3-assets.mercuryanalytics.com/pageviewer/"
      destination += params.dir if params.dir

      cmd = %w[aws s3 sync --acl public-read]
      cmd += exclude_all(excludes_list)
      cmd += exclude_all(root_excludes)
      cmd << source
      cmd << destination
      p cmd
      system(*cmd)
    end
  end
end
