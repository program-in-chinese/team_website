module Jekyll
  module C字符过滤器
    def remove_chars_cn(输入)
      输入.gsub! '\\','&#92;'
      输入.gsub! /\t/, '    '
      输入.gsub! '@',''
      输入.gsub! '$',''
      输入.gsub! '%',''
      输入.gsub! '&',''
      输入.gsub! '"',''
      输入.gsub! '{',''
      输入.gsub! '}',''
      输入
    end
  end
end

Liquid::Template.register_filter(Jekyll::C字符过滤器)
