require 'aws-sdk'

namespace :assets do
  desc 'script to upload files to s3'
  task :deploy, :dir do |t, args|

    puts 'connecting to S3'
    Aws.config = { credentials: Aws::SharedCredentials.new, region: 'us-east-1'}
    files = Dir.glob("#{args.dir}/**/*")
    total_files = files.length
    s3_bucket = Aws::S3::Resource.new.bucket('s3-assets.mercuryanalytics.com')

    until files.empty?
      file = files.pop rescue nil
      next unless file

      path = file
      data = File.open(file)

      if File.directory?(data)
        data.close
        next
      else
        obj = s3_bucket.object("pageviewer/#{path}")
        obj.put(body: data, acl: 'public-read')
        data.close
        puts obj.public_url
      end
    end
    puts total_files.inspect
  end
end
